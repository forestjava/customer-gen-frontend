import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  useDeviceQuery,
  DeviceCreateInput,
  DeviceUpdateInput,
  useCreateOneDeviceMutation,
  useDeleteOneDeviceMutation,
  useUpdateOneDeviceMutation,
} from '../generated';

const LIST_QUERY_KEY = 'Devices';
const ITEM_QUERY_KEY = 'Device';

export const useDeviceForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = useDeviceQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.device, disabled: isLoading && !isCreate });

  const create = useCreateOneDeviceMutation().mutateAsync;
  const update = useUpdateOneDeviceMutation().mutateAsync;
  const remove = useDeleteOneDeviceMutation().mutateAsync;

  const createElement = async () => {
    const input: DeviceCreateInput = {};
    
      
    input.serial = form.values.serial;
      
      
        
    
      
      
    input.type = { connect: { id: form.values.type?.id } };
      
        
    
      
    input.uuid = form.values.uuid;
      
      
        
    
      
      
      
    input.alerts = { connect: form.values.alerts?.map((item) => ({ id: item.id })) };
        
    
      
      
      
    input.events = { connect: form.values.events?.map((item) => ({ id: item.id })) };
        
    
      
      
    input.smartPole = { connect: { id: form.values.smartPole?.id } };
      
        
    
      
    input.name = form.values.name;
      
      
        
    
      
    input.connectParamIndex = form.values.connectParamIndex;
      
      
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: DeviceUpdateInput = {};
    
      
    input.serial = { set: form.values.serial };
      
      
      
    
      
      
    input.type = { connect: { id: form.values.type?.id } };
      
      
    
      
    input.uuid = { set: form.values.uuid };
      
      
      
    
      
      
      
    input.alerts = {
      connect: redundants(form.values.alerts, data?.device?.alerts)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.device?.alerts, form.values.alerts)?.map((item) => ({ id: item.id })),
    };
      
    
      
      
      
    input.events = {
      connect: redundants(form.values.events, data?.device?.events)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.device?.events, form.values.events)?.map((item) => ({ id: item.id })),
    };
      
    
      
      
    input.smartPole = { connect: { id: form.values.smartPole?.id } };
      
      
    
      
    input.name = { set: form.values.name };
      
      
      
    
      
    input.connectParamIndex = { set: form.values.connectParamIndex };
      
      
      
    
    await update({ where: key, data: input });
    await invalidate(LIST_QUERY_KEY);
    await invalidate(ITEM_QUERY_KEY);
    form.close();
  };

  const removeElement = async () => {
    await remove({ where: key });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const submit = () => {
    if (isCreate) createElement();
    else updateElement();
  };

  return {
    isCreate,
    input: form.input,
    button: form.button,
    create: createElement,
    remove: removeElement,
    update: updateElement,
    submit: form.handleSubmit(submit),
    values: form.values,
    reset: form.reset,
    modified: form.modified,
    close: form.close,
  };
};
