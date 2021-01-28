import React, { useState, useEffect } from 'react';
import './VirtualPageStyle.css'
import { getCurentUtcDateTime, getCurentUtcDateTimeString, secToTime } from '../../utils/DateTimeUtils'
import { VirtualPageTable } from './VirtualServersTable'
import { Period } from './Period'

/** Страница с информацией по вирутальным серверам */
export function VirtualServersPage() {
    const [virtualServers, setVirtualServers] = useState([])
    const [serversToRemove, setServersToRemove] = useState([])
    const [currentTime, setCurrentTime] = useState(getCurentUtcDateTimeString())    
    const [totalUsageTime, setTotalUsageTime] = useState('')

    const getAllVirtualServers = async () => {       
        const response = await fetch('/api/v1/virtualServer', {
            method: 'GET'
        });
        return await response.json(); 
    }

    const addAllVirtualServers = async () => {
        const response = await fetch('/api/v1/virtualServer', {
            method: 'POST'
        });
        return await response.json();
    }

    const removeServers = async () => {
        const response = await fetch('/api/v1/virtualServer', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'               
            },
            body: JSON.stringify(serversToRemove)
        });
        setServersToRemove([])
        return await response.json();
    }

    const updateServersInfo = async () => {
        const virtualServers = await getAllVirtualServers();
        
        for (let server of virtualServers) {     
            server.removeDateTime = new Date(server.removeDateTime).getTime()
            server.createDateTime = new Date(server.createDateTime).getTime()
            const remove = !!server.removeDateTime;
            server.remove = remove;
            server.disable = remove;            
            
        }
        const totalTime = getTotalTime(virtualServers);
        setTotalUsageTime(secToTime(totalTime/1000));
        setVirtualServers(virtualServers);        
    }

    const getTotalTime = (servers) => {
        let totaltime = 0;
        if (servers == null || servers.length === 0) {
            return totaltime
        }
        
        const periods = getPeriods(servers)

        for (let period of periods) {
            totaltime += (period.end - period.start)
        }

        return totaltime;
    }

    const getPeriods = (servers) => {
        const periods = [];
        let currPeiod = 0
        if (!servers[currPeiod].removeDateTime) {
            periods.push(new Period(servers[currPeiod].createDateTime, getCurentUtcDateTime()))
            return periods;
        }

        periods.push(new Period(servers[currPeiod].createDateTime, servers[currPeiod].removeDateTime))
        for (let server of servers) {
            if (!server.removeDateTime) {
                const period = new Period(server.createDateTime, getCurentUtcDateTime())
                periods.push(period)
                break;
            }

            if (server.createDateTime >= periods[currPeiod].end) {
                const period = new Period(server.createDateTime, server.removeDateTime)
                periods.push(period)
                currPeiod += 1;
                continue;
            }

            if (server.removeDateTime > periods[currPeiod].end) {
                periods[currPeiod].end = server.removeDateTime
            }
        }
        return periods;
    }

    const updatePageContent = async () => {
        await updateServersInfo();
        setCurrentTime(getCurentUtcDateTimeString())
    }

    const onSelectServer = (serverId) => {
        serversToRemove.push(serverId)
        setServersToRemove([...serversToRemove]);
    }

    const onUnselectServer = (serverId) => {
        const index = serversToRemove.indexOf(serverId);
        serversToRemove.splice(index, 1)
        setServersToRemove([...serversToRemove]);
        console.log(serversToRemove)
    }

    useEffect(() => {
        const timer = setTimeout(updatePageContent, 1000);        
        return () => clearTimeout(timer);
    });

    return (
        <>
            <button onClick={addAllVirtualServers}>Add</button> <button onClick={removeServers}>Remove</button>
            <VirtualPageTable
                virtualServers={virtualServers}
                onSelectServer={onSelectServer}
                onUnselectServer={onUnselectServer}
                currentTime={currentTime}
                totalUsageTime={totalUsageTime}
            />
        </>
    );
}