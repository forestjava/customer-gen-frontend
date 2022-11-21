import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  useSolutionQuery,
  SolutionCreateInput,
  SolutionUpdateInput,
  useCreateOneSolutionMutation,
  useDeleteOneSolutionMutation,
  useUpdateOneSolutionMutation,
} from '../generated';

const LIST_QUERY_KEY = 'Solutions';
const ITEM_QUERY_KEY = 'Solution';

export const useSolutionForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = useSolutionQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.solution, disabled: isLoading && !isCreate });

  const create = useCreateOneSolutionMutation().mutateAsync;
  const update = useUpdateOneSolutionMutation().mutateAsync;
  const remove = useDeleteOneSolutionMutation().mutateAsync;

  const createElement = async () => {
    const input: SolutionCreateInput = {};
    
      
    input.name = form.values.name;
      
      
        
    
      
      
      
    input.formations = { connect: form.values.formations?.map((item) => ({ id: item.id })) };
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: SolutionUpdateInput = {};
    
      
    input.name = { set: form.values.name };
      
      
      
    
      
      
      
    input.formations = {
      connect: redundants(form.values.formations, data?.solution?.formations)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.solution?.formations, form.values.formations)?.map((item) => ({ id: item.id })),
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
