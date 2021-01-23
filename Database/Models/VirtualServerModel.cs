using System;
using System.ComponentModel.DataAnnotations;

namespace RuVdsTest.Database.Models
{
    /// <summary>
    /// Модель вирутального сервера
    /// </summary>
    public class VirtualServerModel
    {
        /// <summary>
        /// Идентификатор виртуального серве
        /// </summary>
        [Key]
        public int VirtualServerId { get; set; }

        /// <summary>
        /// Дата и время создания сервера
        /// </summary>
        public DateTime CreateDateTime { get; set; }

        /// <summary>
        /// Дата и время удаления сервера
        /// </summary>
        public DateTime? RemoveDateTime { get; set; }

        public VirtualServerModel()
        {
            CreateDateTime = DateTime.UtcNow;
        }
    }
}
