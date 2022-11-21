import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  useAlertQuery,
  AlertCreateInput,
  AlertUpdateInput,
  useCreateOneAlertMutation,
  useDeleteOneAlertMutation,
  useUpdateOneAlertMutation,
} from '../generated';

const LIST_QUERY_KEY = 'Alerts';
const ITEM_QUERY_KEY = 'Alert';

export const useAlertForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = useAlertQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.alert, disabled: isLoading && !isCreate });

  const create = useCreateOneAlertMutation().mutateAsync;
  const update = useUpdateOneAlertMutation().mutateAsync;
  const remove = useDeleteOneAlertMutation().mutateAsync;

  const createElement = async () => {
    const input: AlertCreateInput = {};
    
      
      
    input.device = { connect: { id: form.values.device?.id } };
      
        
    
      
    input.message = form.values.message;
      
      
        
    
      
      
    input.priority = { connect: { id: form.values.priority?.id } };
      
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: AlertUpdateInput = {};
    
      
      
    input.device = { connect: { id: form.values.device?.id } };
      
      
    
      
    input.message = { set: form.values.message };
      
      
      
    
      
      
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
