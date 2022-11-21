import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  usePriorityQuery,
  PriorityCreateInput,
  PriorityUpdateInput,
  useCreateOnePriorityMutation,
  useDeleteOnePriorityMutation,
  useUpdateOnePriorityMutation,
} from '../generated';

const LIST_QUERY_KEY = 'Priorities';
const ITEM_QUERY_KEY = 'Priority';

export const usePriorityForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = usePriorityQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.priority, disabled: isLoading && !isCreate });

  const create = useCreateOnePriorityMutation().mutateAsync;
  const update = useUpdateOnePriorityMutation().mutateAsync;
  const remove = useDeleteOnePriorityMutation().mutateAsync;

  const createElement = async () => {
    const input: PriorityCreateInput = {};
    
      
    input.name = form.values.name;
      
      
        
    
      
      
      
    input.alerts = { connect: form.values.alerts?.map((item) => ({ id: item.id })) };
        
    
      
      
      
    input.events = { connect: form.values.events?.map((item) => ({ id: item.id })) };
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: PriorityUpdateInput = {};
    
      
    input.name = { set: form.values.name };
      
      
      
    
      
      
      
    input.alerts = {
      connect: redundants(form.values.alerts, data?.priority?.alerts)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.priority?.alerts, form.values.alerts)?.map((item) => ({ id: item.id })),
    };
      
    
      
      
      
    input.events = {
      connect: redundants(form.values.events, data?.priority?.events)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.priority?.events, form.values.events)?.map((item) => ({ id: item.id })),
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
