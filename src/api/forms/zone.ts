import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  useZoneQuery,
  ZoneCreateInput,
  ZoneUpdateInput,
  useCreateOneZoneMutation,
  useDeleteOneZoneMutation,
  useUpdateOneZoneMutation,
} from '../generated';

const LIST_QUERY_KEY = 'Zones';
const ITEM_QUERY_KEY = 'Zone';

export const useZoneForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = useZoneQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.zone, disabled: isLoading && !isCreate });

  const create = useCreateOneZoneMutation().mutateAsync;
  const update = useUpdateOneZoneMutation().mutateAsync;
  const remove = useDeleteOneZoneMutation().mutateAsync;

  const createElement = async () => {
    const input: ZoneCreateInput = {};
    
      
    input.name = form.values.name;
      
      
        
    
      
      
    input.formation = { connect: { id: form.values.formation?.id } };
      
        
    
      
      
      
    input.smartPoles = { connect: form.values.smartPoles?.map((item) => ({ id: item.id })) };
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: ZoneUpdateInput = {};
    
      
    input.name = { set: form.values.name };
      
      
      
    
      
      
    input.formation = { connect: { id: form.values.formation?.id } };
      
      
    
      
      
      
    input.smartPoles = {
      connect: redundants(form.values.smartPoles, data?.zone?.smartPoles)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.zone?.smartPoles, form.values.smartPoles)?.map((item) => ({ id: item.id })),
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
