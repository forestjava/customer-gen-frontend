import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  useRegionQuery,
  RegionCreateInput,
  RegionUpdateInput,
  useCreateOneRegionMutation,
  useDeleteOneRegionMutation,
  useUpdateOneRegionMutation,
} from '../generated';

const LIST_QUERY_KEY = 'Regions';
const ITEM_QUERY_KEY = 'Region';

export const useRegionForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = useRegionQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.region, disabled: isLoading && !isCreate });

  const create = useCreateOneRegionMutation().mutateAsync;
  const update = useUpdateOneRegionMutation().mutateAsync;
  const remove = useDeleteOneRegionMutation().mutateAsync;

  const createElement = async () => {
    const input: RegionCreateInput = {};
    
      
    input.name = form.values.name;
      
      
        
    
      
      
    input.company = { connect: { id: form.values.company?.id } };
      
        
    
      
      
      
    input.formations = { connect: form.values.formations?.map((item) => ({ id: item.id })) };
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: RegionUpdateInput = {};
    
      
    input.name = { set: form.values.name };
      
      
      
    
      
      
    input.company = { connect: { id: form.values.company?.id } };
      
      
    
      
      
      
    input.formations = {
      connect: redundants(form.values.formations, data?.region?.formations)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.region?.formations, form.values.formations)?.map((item) => ({ id: item.id })),
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
