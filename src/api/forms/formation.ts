import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  useFormationQuery,
  FormationCreateInput,
  FormationUpdateInput,
  useCreateOneFormationMutation,
  useDeleteOneFormationMutation,
  useUpdateOneFormationMutation,
} from '../generated';

const LIST_QUERY_KEY = 'Formations';
const ITEM_QUERY_KEY = 'Formation';

export const useFormationForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = useFormationQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.formation, disabled: isLoading && !isCreate });

  const create = useCreateOneFormationMutation().mutateAsync;
  const update = useUpdateOneFormationMutation().mutateAsync;
  const remove = useDeleteOneFormationMutation().mutateAsync;

  const createElement = async () => {
    const input: FormationCreateInput = {};
    
      
    input.name = form.values.name;
      
      
        
    
      
    input.address = form.values.address;
      
      
        
    
      
      
      
    input.solutions = { connect: form.values.solutions?.map((item) => ({ id: item.id })) };
        
    
      
      
    input.region = { connect: { id: form.values.region?.id } };
      
        
    
      
      
      
    input.zones = { connect: form.values.zones?.map((item) => ({ id: item.id })) };
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: FormationUpdateInput = {};
    
      
    input.name = { set: form.values.name };
      
      
      
    
      
    input.address = { set: form.values.address };
      
      
      
    
      
      
      
    input.solutions = {
      connect: redundants(form.values.solutions, data?.formation?.solutions)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.formation?.solutions, form.values.solutions)?.map((item) => ({ id: item.id })),
    };
      
    
      
      
    input.region = { connect: { id: form.values.region?.id } };
      
      
    
      
      
      
    input.zones = {
      connect: redundants(form.values.zones, data?.formation?.zones)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.formation?.zones, form.values.zones)?.map((item) => ({ id: item.id })),
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
