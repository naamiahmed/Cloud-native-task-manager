using Microsoft.AspNetCore.Mvc;
using TaskApi.Models;
using System.Collections.Generic;
using System.Linq;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/task")]
    public class TaskController : ControllerBase
    {
        private static List<TaskItem> tasks = new();

        [HttpGet]
        public IEnumerable<TaskItem> Get() => tasks;

        [HttpPost]
        public IActionResult Post([FromBody] TaskItem task)
        {
            if (string.IsNullOrWhiteSpace(task.Name))
            {
                return BadRequest(new { error = "Task name is required" });
            }

            task.Id = tasks.Count > 0 ? tasks.Max(t => t.Id) + 1 : 1;
            tasks.Add(task);
            return CreatedAtAction(nameof(Get), new { id = task.Id }, task);
        }
    }
}
