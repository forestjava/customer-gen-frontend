
import { UsersList } from '../bags/UsersList';

import { UserRolesList } from '../bags/UserRolesList';

import { UserGroupsList } from '../bags/UserGroupsList';

import { CompaniesList } from '../bags/CompaniesList';

import { RegionsList } from '../bags/RegionsList';

import { SolutionsList } from '../bags/SolutionsList';

import { FormationsList } from '../bags/FormationsList';

import { ZonesList } from '../bags/ZonesList';

import { DevicesList } from '../bags/DevicesList';

import { DeviceTypesList } from '../bags/DeviceTypesList';

import { AlertsList } from '../bags/AlertsList';

import { PrioritiesList } from '../bags/PrioritiesList';

import { EventsList } from '../bags/EventsList';

import { SmartPolesList } from '../bags/SmartPolesList';


const routes = [
  
  { id: 1, name: 'Users', url: 'users', element: <UsersList /> },
  
  { id: 2, name: 'UserRoles', url: 'userRoles', element: <UserRolesList /> },
  
  { id: 3, name: 'UserGroups', url: 'userGroups', element: <UserGroupsList /> },
  
  { id: 4, name: 'Companies', url: 'companies', element: <CompaniesList /> },
  
  { id: 5, name: 'Regions', url: 'regions', element: <RegionsList /> },
  
  { id: 6, name: 'Solutions', url: 'solutions', element: <SolutionsList /> },
  
  { id: 7, name: 'Formations', url: 'formations', element: <FormationsList /> },
  
  { id: 8, name: 'Zones', url: 'zones', element: <ZonesList /> },
  
  { id: 9, name: 'Devices', url: 'devices', element: <DevicesList /> },
  
  { id: 10, name: 'DeviceTypes', url: 'deviceTypes', element: <DeviceTypesList /> },
  
  { id: 11, name: 'Alerts', url: 'alerts', element: <AlertsList /> },
  
  { id: 12, name: 'Priorities', url: 'priorities', element: <PrioritiesList /> },
  
  { id: 13, name: 'Events', url: 'events', element: <EventsList /> },
  
  { id: 14, name: 'SmartPoles', url: 'smartPoles', element: <SmartPolesList /> },
  
];

export default routes;
