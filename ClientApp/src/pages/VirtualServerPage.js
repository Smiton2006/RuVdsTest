import React, { useState, useEffect } from 'react';
import './VirtualPageCss.css'

const getCurentDateTime = () => {
    const now = new Date;
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
        now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
}

const getCurentDateTimeString = () => {
    return getCurentDateTime().toLocaleString().replace(',', '')
}

const toTime = (sec) => {
    var hours = Math.floor(sec / 3600);
    var minutes = Math.floor((sec - (hours * 3600)) / 60);
    var seconds = Math.floor(sec - (hours * 3600) - (minutes * 60));

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return `${hours}:${minutes}:${seconds}`;    
}

export function VirtualServerPage() {
    const [virtualServers, setVirtualServers] = useState([])
    const [serversToRemove, setServersToRemove] = useState([])
    const [currentTime, setCurrentTime] = useState(getCurentDateTimeString())    
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
        return await response.json();
    }

    const updateServers = async () => {
        const virtualServers = await getAllVirtualServers();
        let totaltime = 0;
        for (let server of virtualServers) {            
            
            if (server.removeDateTime) {
                totaltime += (new Date(server.removeDateTime).getTime() - new Date(server.createDateTime).getTime());
                server.removeDateTime = new Date(server.removeDateTime).toLocaleString('ru-RU').replace(',', '');
            }
            else {
                totaltime += (getCurentDateTime().getTime() - new Date(server.createDateTime).getTime());
            }
            server.createDateTime = new Date(server.createDateTime).toLocaleString('ru-RU').replace(',', '');
            const remove = !!server.removeDateTime;
            server.remove = remove;
            server.disable = remove;
        }
        setTotalUsageTime(toTime(totaltime/1000));
        setVirtualServers(virtualServers);        
    }

    const updatePageContent = async () => {
        await updateServers();
        setCurrentTime(getCurentDateTimeString())
    }

    useEffect(() => {
        const timer = setTimeout(updatePageContent, 1000);        
        return () => clearTimeout(timer);
    });

    return (<>
        <button onClick={addAllVirtualServers}>Add</button> <button onClick={removeServers}>Remove</button>
            <table>  
                <thead>
                    </thead>
                <tbody>
                    <tr>
                        <th>CurrentDateTime:</th>
                    <th>{currentTime}</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>TotalUsageTime:</td>
                        <td>{totalUsageTime}</td>
                        <td></td>
                        <td></td>
                    </tr>
            </tbody>

                <thead>
                    <tr>
                        <td>VirtualServerId</td>
                        <td>CreateDateTime</td>
                        <td>RemoveDateTime</td>
                        <td>SelectedForRemove</td>
                    </tr>
                </thead>
                <tbody>
                    {virtualServers.map((server) =>
                        <tr key={server.virtualServerId}>
                            <td>{server.virtualServerId}</td>
                            <td>{server.createDateTime}</td>
                            <td>{server.removeDateTime}</td>
                            <td> <SelectedForRemoveCheckbox
                                remove={server.remove}
                                disabe={server.disable}
                                onSelect={() => {
                                    serversToRemove.push(server.virtualServerId)
                                    setServersToRemove([...serversToRemove]);                                    
                                }}
                                onUnselect={() => {
                                    const index = serversToRemove.indexOf(server.virtualServerId);
                                    serversToRemove.splice(index, 1)
                                    setServersToRemove([...serversToRemove]);
                                    console.log(serversToRemove)
                                }}
                                /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

/**
 * 
 * @param {any} param0
 */
function SelectedForRemoveCheckbox({ remove, disabe, onSelect, onUnselect }) {
    const [checked, setChecked] = useState(remove)

    const onChange = () => {
        if (!checked) {
            onSelect()
        }
        else {
            onUnselect()
        }
        setChecked(!checked)
    }

    return <input type='checkbox' checked={checked} disabled={disabe} onChange={onChange} />
}