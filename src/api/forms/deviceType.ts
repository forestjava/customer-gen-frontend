import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  useDeviceTypeQuery,
  DeviceTypeCreateInput,
  DeviceTypeUpdateInput,
  useCreateOneDeviceTypeMutation,
  useDeleteOneDeviceTypeMutation,
  useUpdateOneDeviceTypeMutation,
} from '../generated';

const LIST_QUERY_KEY = 'DeviceTypes';
const ITEM_QUERY_KEY = 'DeviceType';

export const useDeviceTypeForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = useDeviceTypeQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.deviceType, disabled: isLoading && !isCreate });

  const create = useCreateOneDeviceTypeMutation().mutateAsync;
  const update = useUpdateOneDeviceTypeMutation().mutateAsync;
  const remove = useDeleteOneDeviceTypeMutation().mutateAsync;

  const createElement = async () => {
    const input: DeviceTypeCreateInput = {};
    
      
    input.name = form.values.name;
      
      
        
    
      
      
      
    input.devices = { connect: form.values.devices?.map((item) => ({ id: item.id })) };
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: DeviceTypeUpdateInput = {};
    
      
    input.name = { set: form.values.name };
      
      
      
    
      
      
      
    input.devices = {
      connect: redundants(form.values.devices, data?.deviceType?.devices)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.deviceType?.devices, form.values.devices)?.map((item) => ({ id: item.id })),
    };
      
    
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
