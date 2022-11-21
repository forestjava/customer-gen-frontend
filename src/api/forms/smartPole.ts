import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  useSmartPoleQuery,
  SmartPoleCreateInput,
  SmartPoleUpdateInput,
  useCreateOneSmartPoleMutation,
  useDeleteOneSmartPoleMutation,
  useUpdateOneSmartPoleMutation,
} from '../generated';

const LIST_QUERY_KEY = 'SmartPoles';
const ITEM_QUERY_KEY = 'SmartPole';

export const useSmartPoleForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = useSmartPoleQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.smartPole, disabled: isLoading && !isCreate });

  const create = useCreateOneSmartPoleMutation().mutateAsync;
  const update = useUpdateOneSmartPoleMutation().mutateAsync;
  const remove = useDeleteOneSmartPoleMutation().mutateAsync;

  const createElement = async () => {
    const input: SmartPoleCreateInput = {};
    
      
    input.name = form.values.name;
      
      
        
    
      
    input.serial = form.values.serial;
      
      
        
    
      
    input.latitude = form.values.latitude;
      
      
        
    
      
    input.longitude = form.values.longitude;
      
      
        
    
      
      
    input.zone = { connect: { id: form.values.zone?.id } };
      
        
    
      
      
      
    input.devices = { connect: form.values.devices?.map((item) => ({ id: item.id })) };
        
    
      
    input.connectLocationId = form.values.connectLocationId;
      
      
        
    
      
    input.connectDeviceId = form.values.connectDeviceId;
      
      
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: SmartPoleUpdateInput = {};
    
      
    input.name = { set: form.values.name };
      
      
      
    
      
    input.serial = { set: form.values.serial };
      
      
      
    
      
    input.latitude = { set: form.values.latitude };
      
      
      
    
      
    input.longitude = { set: form.values.longitude };
      
      
      
    
      
      
    input.zone = { connect: { id: form.values.zone?.id } };
      
      
    
      
      
      
    input.devices = {
      connect: redundants(form.values.devices, data?.smartPole?.devices)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.smartPole?.devices, form.values.devices)?.map((item) => ({ id: item.id })),
    };
      
    
      
    input.connectLocationId = { set: form.values.connectLocationId };
      
      
      
    
      
    input.connectDeviceId = { set: form.values.connectDeviceId };
      
      
      
    
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
