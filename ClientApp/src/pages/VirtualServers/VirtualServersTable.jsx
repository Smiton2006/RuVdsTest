import React from 'react';
import SelectedForRemoveCheckbox from './SelectedForRemoveCheckbox'
import { formatDate } from '../../utils/DateTimeUtils'

class Props {
    /** 
     * Список виртуальных серверов
     * @type {object[]}
     */
    virtualServers;

    /**
    * Действие при выборе сервера
    * @type {()=> void}
    */
    onSelectServer;

    /**
    * Действие при отмене выбора сервера
    * @type {()=> void}
    */
    onUnselectServer;

    /**
    * Текушее время
    * @type {string}
    */
    currentTime;

    /**
    * Все время использования серверов
    * @type {string}
    */
    totalUsageTime;
}

/**
 * Таблица с информацией по виртуальным серверам
 * @param {Props} props
 */
export function VirtualPageTable({ virtualServers, onSelectServer, onUnselectServer, currentTime, totalUsageTime}) {
    return (        
        <table>
            <tbody>
                <tr>
                    <td>CurrentDateTime:</td>
                    <td>{formatDate(currentTime)}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>TotalUsageTime:</td>
                    <td>{totalUsageTime}</td>
                    <td></td>
                    <td></td>
                </tr>
            <tr>
                <td>VirtualServerId</td>
                <td>CreateDateTime</td>
                <td>RemoveDateTime</td>
                <td>SelectedForRemove</td>
            </tr>            
                {virtualServers.map((server) =>
                    <tr key={server.virtualServerId}>
                        <td>{server.virtualServerId}</td>
                        <td>{formatDate(server.createDateTime)}</td>
                        <td>{formatDate(server.removeDateTime)}</td>
                        <td> <SelectedForRemoveCheckbox
                            remove={server.remove}
                            disable={server.disable}
                            onSelect={() => { onSelectServer(server.virtualServerId) }}
                            onUnselect={() => { onUnselectServer(server.virtualServerId) }}
                        /></td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}