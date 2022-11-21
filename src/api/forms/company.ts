import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  useCompanyQuery,
  CompanyCreateInput,
  CompanyUpdateInput,
  useCreateOneCompanyMutation,
  useDeleteOneCompanyMutation,
  useUpdateOneCompanyMutation,
} from '../generated';

const LIST_QUERY_KEY = 'Companies';
const ITEM_QUERY_KEY = 'Company';

export const useCompanyForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = useCompanyQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.company, disabled: isLoading && !isCreate });

  const create = useCreateOneCompanyMutation().mutateAsync;
  const update = useUpdateOneCompanyMutation().mutateAsync;
  const remove = useDeleteOneCompanyMutation().mutateAsync;

  const createElement = async () => {
    const input: CompanyCreateInput = {};
    
      
    input.name = form.values.name;
      
      
        
    
      
    input.icon = form.values.icon;
      
      
        
    
      
    input.logo = form.values.logo;
      
      
        
    
      
      
      
    input.regions = { connect: form.values.regions?.map((item) => ({ id: item.id })) };
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: CompanyUpdateInput = {};
    
      
    input.name = { set: form.values.name };
      
      
      
    
      
    input.icon = { set: form.values.icon };
      
      
      
    
      
    input.logo = { set: form.values.logo };
      
      
      
    
      
      
      
    input.regions = {
      connect: redundants(form.values.regions, data?.company?.regions)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.company?.regions, form.values.regions)?.map((item) => ({ id: item.id })),
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
