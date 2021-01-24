import React, { useState, useEffect } from 'react';
import './VirtualPageStyle.css'
import { getCurentUtcDateTime, getCurentUtcDateTimeString, secToTime } from '../../utils/DateTimeUtils'
import { VirtualPageTable } from './VirtualServersTable'

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
        let totaltime = 0;
        for (let server of virtualServers) {            
            
            if (server.removeDateTime) {
                totaltime += (new Date(server.removeDateTime).getTime() - new Date(server.createDateTime).getTime());
                server.removeDateTime = new Date(server.removeDateTime).toLocaleString('ru-RU').replace(',', '');
            }
            else {
                totaltime += (getCurentUtcDateTime().getTime() - new Date(server.createDateTime).getTime());
            }
            server.createDateTime = new Date(server.createDateTime).toLocaleString('ru-RU').replace(',', '');
            const remove = !!server.removeDateTime;
            server.remove = remove;
            server.disable = remove;
        }
        setTotalUsageTime(secToTime(totaltime/1000));
        setVirtualServers(virtualServers);        
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