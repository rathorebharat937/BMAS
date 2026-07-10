import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

export const DataContext = createContext(null);

const DEFAULT_PROJECTS = [
  { id: 'proj-1', name: 'BMAS Portal Redesign', key: 'BMAS', description: 'Redesign the BMAS Frontend to match Zoho BugTracker standards.', status: 'Active', progress: 68 },
  { id: 'proj-2', name: 'Zylker Mobile Client', key: 'ZMC', description: 'Create React Native client for mobile users.', status: 'Active', progress: 42 },
  { id: 'proj-3', name: 'Zoho Mail Integration', key: 'ZMI', description: 'Integrate email ticketing pipelines into the core application.', status: 'Planning', progress: 10 }
];

const DEFAULT_SPRINTS = [
  { id: 'sprint-1', projectId: 'proj-1', name: 'Sprint 1 - UI Foundations', status: 'Active', startDate: '2026-06-15', endDate: '2026-06-29' },
  { id: 'sprint-2', projectId: 'proj-1', name: 'Sprint 2 - Kanban Board', status: 'Future', startDate: '2026-06-30', endDate: '2026-07-14' },
  { id: 'sprint-3', projectId: 'proj-2', name: 'Mobile Authentication', status: 'Active', startDate: '2026-06-10', endDate: '2026-06-24' }
];

const DEFAULT_TEAM = [
  { id: 'u-1', name: 'Bharat Rathore', email: 'bharat@bmas.com', role: 'PROJECT_MANAGER', expertise: 'UI/UX & System Architecture', avatar: 'BR', workload: 2 },
  { id: 'u-2', name: 'Jane Smith', email: 'jane.smith@bmas.com', role: 'DEVELOPER', expertise: 'React, Tailwind, Node.js', avatar: 'JS', workload: 3 },
  { id: 'u-3', name: 'Alex Johnson', email: 'alex.johnson@bmas.com', role: 'TESTER', expertise: 'Selenium, Cypress, JUnit', avatar: 'AJ', workload: 1 },
  { id: 'u-4', name: 'Bob Builder', email: 'bob.builder@bmas.com', role: 'DEVELOPER', expertise: 'Spring Boot, PostgreSQL, Docker', avatar: 'BB', workload: 4 }
];

const DEFAULT_BUGS = [
  {
    id: 'BMAS-101',
    projectId: 'proj-1',
    title: 'Sidebar navigation lags during toggle on low-end devices',
    description: 'When the sidebar is toggled on low-end mobile devices, there is a visible delay in the grid repainting. This seems to be due to excessive DOM nodes or unoptimized CSS transitions. Need to optimize CSS variables.',
    severity: 'MAJOR',
    priority: 'MEDIUM',
    status: 'IN_PROGRESS',
    assignee: 'Jane Smith',
    reporter: 'Alex Johnson',
    createdDate: '2026-06-16T10:30:00.000Z',
    sprintId: 'sprint-1',
    reproductionSteps: '1. Open the BMAS application on a simulated low-end mobile device.\n2. Click the sidebar hamburger button multiple times rapidly.\n3. Observe visual frame drops.',
    attachments: ['mobile-profile-lag.mp4', 'screenshot-repaint.png'],
    comments: [
      { id: 'c-1', author: 'Jane Smith', avatar: 'JS', text: 'I am tracking down the CSS layout repainting issue. Will remove some box shadows.', timestamp: '2026-06-17T11:00:00.000Z' },
      { id: 'c-2', author: 'Bharat Rathore', avatar: 'BR', text: 'Sounds good. Let us make sure we test it with standard 3G throttling as well.', timestamp: '2026-06-17T14:30:00.000Z' }
    ]
  },
  {
    id: 'BMAS-102',
    projectId: 'proj-1',
    title: 'Token expires silently without prompting user for re-auth',
    description: 'If the JWT expires while a user is editing a bug details form, the save action fails with a generic network error and the user loses all typed text. The app should check expiry and offer a token refresh modal or save draft locally.',
    severity: 'CRITICAL',
    priority: 'HIGH',
    status: 'OPEN',
    assignee: 'Jane Smith',
    reporter: 'Bharat Rathore',
    createdDate: '2026-06-18T08:15:00.000Z',
    sprintId: 'sprint-1',
    reproductionSteps: '1. Log in and wait for the short-lived JWT to expire.\n2. Open any bug page and click Edit Description.\n3. Make changes and click Save.\n4. Notice the API returns 401, but UI shows a blank page or generic error.',
    attachments: [],
    comments: []
  },
  {
    id: 'BMAS-103',
    projectId: 'proj-1',
    title: 'RoleSwitcher component doesn\'t sync in secondary tabs',
    description: 'When switching roles in Tab A, the active token is updated in LocalStorage, but Tab B continues to use the previous role until a manual page refresh. Need to listen to the storage event.',
    severity: 'MINOR',
    priority: 'LOW',
    status: 'ASSIGNED',
    assignee: 'Bob Builder',
    reporter: 'Alex Johnson',
    createdDate: '2026-06-19T15:20:00.000Z',
    sprintId: 'sprint-1',
    reproductionSteps: '1. Open the portal in two separate browser tabs.\n2. In Tab A, switch role from Developer to PM.\n3. In Tab B, attempt to view a developer-only view.\n4. Tab B doesn\'t reflect role change dynamically.',
    attachments: [],
    comments: []
  },
  {
    id: 'BMAS-104',
    projectId: 'proj-1',
    title: 'SQL Exception thrown when register request contains blank space in email',
    description: 'If a user registers with "bharat @bmas.com" (with trailing/leading or middle spaces), the validation logic fails on the backend and throws an internal Server Error (500) rather than a clean validation warning.',
    severity: 'CRITICAL',
    priority: 'HIGH',
    status: 'TESTING',
    assignee: 'Bob Builder',
    reporter: 'Alex Johnson',
    createdDate: '2026-06-20T09:45:00.000Z',
    sprintId: 'sprint-1',
    reproductionSteps: '1. Navigate to Sign Up page.\n2. Input email with spaces "alex .johnson@bmas.com".\n3. Click Register.\n4. Observe 500 error and stack trace.',
    attachments: ['sql-trace.log'],
    comments: [
      { id: 'c-3', author: 'Bob Builder', avatar: 'BB', text: 'Ah, I see. I added frontend email trimming, but we should notify the team that backend validation can be reinforced too.', timestamp: '2026-06-21T05:00:00.000Z' }
    ]
  },
  {
    id: 'ZMC-201',
    projectId: 'proj-2',
    title: 'App crashes immediately on iOS 17 startup',
    description: 'React Native startup crashes on iOS 17 simulator due to a native dependency mismatch in the vector icons library. Need to upgrade the podspec.',
    severity: 'CRITICAL',
    priority: 'HIGH',
    status: 'OPEN',
    assignee: 'Jane Smith',
    reporter: 'Bharat Rathore',
    createdDate: '2026-06-15T12:00:00.000Z',
    sprintId: 'sprint-3',
    reproductionSteps: '1. Build ZMC for iOS Simulator on iOS 17.\n2. Run target.\n3. App loads splash screen and exits with SIGABRT.',
    attachments: [],
    comments: []
  },
  {
    id: 'ZMC-202',
    projectId: 'proj-2',
    title: 'Push notifications fail when device token is empty',
    description: 'If the user declines push notification permissions, the device token is recorded as empty string, which causes Firebase functions to reject the payload and stop all other pushes in batch.',
    severity: 'MAJOR',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    assignee: 'Jane Smith',
    reporter: 'Alex Johnson',
    createdDate: '2026-06-16T14:00:00.000Z',
    sprintId: 'sprint-3',
    reproductionSteps: '1. Deny push notifications on app startup.\n2. Trigger a notification from backend.\n3. View firebase cloud logs showing batch rejection.',
    attachments: [],
    comments: [
      { id: 'c-4', author: 'Alex Johnson', avatar: 'AJ', text: 'Verified this is resolved on build v1.0.2.', timestamp: '2026-06-18T10:00:00.000Z' }
    ]
  }
];

const DEFAULT_NOTIFICATIONS = [
  { id: 'n-1', text: 'Jane Smith started working on BMAS-101 (Sidebar toggle delay).', read: false, time: '2 hours ago' },
  { id: 'n-2', text: 'Alex Johnson reported a new Critical bug: BMAS-104 (Registration SQL exception).', read: false, time: '5 hours ago' },
  { id: 'n-3', text: 'Bob Builder resolved ZMC-202 (Push notification device token fail).', read: true, time: '1 day ago' }
];

const DEFAULT_ACTIVITIES = [
  { id: 'a-1', user: 'Jane Smith', avatar: 'JS', action: 'changed status to', target: 'IN_PROGRESS', bugId: 'BMAS-101', time: '2026-06-21T17:30:00.000Z' },
  { id: 'a-2', user: 'Alex Johnson', avatar: 'AJ', action: 'created bug', target: 'BMAS-104', bugId: 'BMAS-104', time: '2026-06-20T09:45:00.000Z' },
  { id: 'a-3', user: 'Bob Builder', avatar: 'BB', action: 'commented on', target: 'c-3', bugId: 'BMAS-104', time: '2026-06-21T05:00:00.000Z' },
  { id: 'a-4', user: 'Bharat Rathore', avatar: 'BR', action: 'changed status to', target: 'OPEN', bugId: 'BMAS-102', time: '2026-06-18T08:15:00.000Z' }
];

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('bmas_projects');
    return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
  });

  const [sprints, setSprints] = useState(() => {
    const saved = localStorage.getItem('bmas_sprints');
    return saved ? JSON.parse(saved) : DEFAULT_SPRINTS;
  });

  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem('bmas_team');
    return saved ? JSON.parse(saved) : DEFAULT_TEAM;
  });

  const [bugs, setBugs] = useState(() => {
    const saved = localStorage.getItem('bmas_bugs');
    return saved ? JSON.parse(saved) : DEFAULT_BUGS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('bmas_notifications');
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('bmas_activities');
    return saved ? JSON.parse(saved) : DEFAULT_ACTIVITIES;
  });

  const [activeProjectId, setActiveProjectId] = useState(() => {
    const saved = localStorage.getItem('bmas_active_project_id');
    return saved ? saved : 'proj-1'; // Default to first project
  });

  const [searchQuery, setSearchQuery] = useState('');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('bmas_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('bmas_sprints', JSON.stringify(sprints));
  }, [sprints]);

  useEffect(() => {
    localStorage.setItem('bmas_team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('bmas_bugs', JSON.stringify(bugs));
  }, [bugs]);

  useEffect(() => {
    localStorage.setItem('bmas_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('bmas_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('bmas_active_project_id', activeProjectId);
  }, [activeProjectId]);

  // Sync team workload with active bugs
  useEffect(() => {
    setTeam(prevTeam => {
      return prevTeam.map(member => {
        const count = bugs.filter(b => b.assignee === member.name && b.status !== 'CLOSED' && b.status !== 'RESOLVED').length;
        return { ...member, workload: count };
      });
    });
  }, [bugs]);

  const addActivity = (action, target, bugId) => {
    const actorName = user?.name || 'Unknown User';
    const initials = actorName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    
    const newActivity = {
      id: `a-${Date.now()}`,
      user: actorName,
      avatar: initials || 'U',
      action,
      target,
      bugId,
      time: new Date().toISOString()
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  const addNotification = (text) => {
    const newNotif = {
      id: `n-${Date.now()}`,
      text,
      read: false,
      time: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const createBug = (bugData) => {
    // Generate bug count for project prefix
    const project = projects.find(p => p.id === bugData.projectId) || projects[0];
    const projectBugs = bugs.filter(b => b.projectId === bugData.projectId);
    const bugNum = 100 + projectBugs.length + 1;
    const bugId = `${project.key}-${bugNum}`;

    const newBug = {
      ...bugData,
      id: bugId,
      status: bugData.status || 'OPEN',
      createdDate: new Date().toISOString(),
      comments: [],
      attachments: bugData.attachments || [],
      reproductionSteps: bugData.reproductionSteps || '',
      description: bugData.description || ''
    };

    setBugs(prev => [newBug, ...prev]);
    addActivity('created bug', bugId, bugId);
    addNotification(`New Bug ${bugId} (${bugData.title}) was created by ${user?.name || 'a user'}`);
    return newBug;
  };

  const updateBug = (id, updatedFields) => {
    setBugs(prev => {
      return prev.map(bug => {
        if (bug.id === id) {
          // Log changes
          const changes = [];
          if (updatedFields.status && updatedFields.status !== bug.status) {
            changes.push(`status to ${updatedFields.status}`);
            addActivity('changed status to', updatedFields.status, id);
          }
          if (updatedFields.assignee && updatedFields.assignee !== bug.assignee) {
            changes.push(`assignee to ${updatedFields.assignee}`);
            addActivity('assigned to', updatedFields.assignee, id);
          }
          if (changes.length === 0) {
            addActivity('updated details of', id, id);
          }

          if (changes.length > 0) {
            addNotification(`Bug ${id} updated: ${changes.join(', ')}`);
          }

          return { ...bug, ...updatedFields };
        }
        return bug;
      });
    });
  };

  const deleteBug = (id) => {
    setBugs(prev => prev.filter(b => b.id !== id));
    addActivity('deleted bug', id, id);
    addNotification(`Bug ${id} was deleted.`);
  };

  const addComment = (bugId, commentText) => {
    const actorName = user?.name || 'Unknown User';
    const initials = actorName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const commentId = `c-${Date.now()}`;

    const newComment = {
      id: commentId,
      author: actorName,
      avatar: initials,
      text: commentText,
      timestamp: new Date().toISOString()
    };

    setBugs(prev => {
      return prev.map(bug => {
        if (bug.id === bugId) {
          return {
            ...bug,
            comments: [...(bug.comments || []), newComment]
          };
        }
        return bug;
      });
    });

    addActivity('commented on', commentId, bugId);
    addNotification(`${actorName} commented on bug ${bugId}`);
  };

  const deleteComment = (bugId, commentId) => {
    setBugs(prev => {
      return prev.map(bug => {
        if (bug.id === bugId) {
          return {
            ...bug,
            comments: bug.comments.filter(c => c.id !== commentId)
          };
        }
        return bug;
      });
    });
  };

  const updateComment = (bugId, commentId, newText) => {
    setBugs(prev => {
      return prev.map(bug => {
        if (bug.id === bugId) {
          return {
            ...bug,
            comments: bug.comments.map(c => {
              if (c.id === commentId) {
                return { ...c, text: newText, timestamp: new Date().toISOString() };
              }
              return c;
            })
          };
        }
        return bug;
      });
    });
  };

  const clearNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearSingleNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <DataContext.Provider value={{
      projects,
      sprints,
      team,
      bugs,
      notifications,
      activities,
      activeProjectId,
      setActiveProjectId,
      searchQuery,
      setSearchQuery,
      createBug,
      updateBug,
      deleteBug,
      addComment,
      deleteComment,
      updateComment,
      clearNotifications,
      clearSingleNotification
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
