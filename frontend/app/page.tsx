'use client';

import { useState, useEffect } from 'react';

interface TaskItem {
  id: number;
  name: string;
}

const API_URL = 'http://localhost:5107/api/task';

export default function Home() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API_URL);
      if (!res.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!task.trim()) {
      setError('Task name cannot be empty');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: task.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Failed to add task' }));
        throw new Error(errorData.error || 'Failed to add task');
      }

      const data = await res.json();
      setTasks([...tasks, data]);
      setTask('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error adding task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      addTask();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-2xl flex-col items-center py-16 px-8 bg-white dark:bg-black">
        <div className="w-full max-w-lg">
          <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-zinc-50">
            Task Manager
          </h1>

          {/* Add Task Section */}
          <div className="mb-8 flex gap-2">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter task name..."
              disabled={loading}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                       bg-white dark:bg-gray-900 text-black dark:text-zinc-50 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={addTask}
              disabled={loading || !task.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 active:bg-blue-800 
                       disabled:opacity-50 disabled:cursor-not-allowed 
                       transition-colors font-medium"
            >
              {loading ? 'Adding...' : 'Add Task'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 
                          text-red-700 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Tasks List */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 min-h-[200px] max-h-[60vh] overflow-y-auto">
            {loading && tasks.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : tasks.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                No tasks yet. Add your first task above!
              </p>
            ) : (
              <ul className="space-y-2">
                {tasks.map((t) => (
                  <li
                    key={t.id}
                    className="px-4 py-3 bg-white dark:bg-gray-800 rounded-lg 
                             border border-gray-200 dark:border-gray-700 
                             text-black dark:text-zinc-50 
                             hover:shadow-md transition-shadow"
                  >
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-2">
                      #{t.id}
                    </span>
                    {t.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Task Count */}
          {tasks.length > 0 && (
            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
