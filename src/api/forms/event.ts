import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  useEventQuery,
  EventCreateInput,
  EventUpdateInput,
  useCreateOneEventMutation,
  useDeleteOneEventMutation,
  useUpdateOneEventMutation,
} from '../generated';

const LIST_QUERY_KEY = 'Events';
const ITEM_QUERY_KEY = 'Event';

export const useEventForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = useEventQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.event, disabled: isLoading && !isCreate });

  const create = useCreateOneEventMutation().mutateAsync;
  const update = useUpdateOneEventMutation().mutateAsync;
  const remove = useDeleteOneEventMutation().mutateAsync;

  const createElement = async () => {
    const input: EventCreateInput = {};
    
      
    input.moment = form.values.moment;
      
      
        
    
      
    input.message = form.values.message;
      
      
        
    
      
      
    input.device = { connect: { id: form.values.device?.id } };
      
        
    
      
      
    input.priority = { connect: { id: form.values.priority?.id } };
      
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: EventUpdateInput = {};
    
      
    input.moment = { set: form.values.moment };
      
      
      
    
      
    input.message = { set: form.values.message };
      
      
      
    
      
      
    input.device = { connect: { id: form.values.device?.id } };
      
      
    
      
      
    input.priority = { connect: { id: form.values.priority?.id } };
      
      
    
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
