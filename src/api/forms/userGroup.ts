import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  useUserGroupQuery,
  UserGroupCreateInput,
  UserGroupUpdateInput,
  useCreateOneUserGroupMutation,
  useDeleteOneUserGroupMutation,
  useUpdateOneUserGroupMutation,
} from '../generated';

const LIST_QUERY_KEY = 'UserGroups';
const ITEM_QUERY_KEY = 'UserGroup';

export const useUserGroupForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = useUserGroupQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.userGroup, disabled: isLoading && !isCreate });

  const create = useCreateOneUserGroupMutation().mutateAsync;
  const update = useUpdateOneUserGroupMutation().mutateAsync;
  const remove = useDeleteOneUserGroupMutation().mutateAsync;

  const createElement = async () => {
    const input: UserGroupCreateInput = {};
    
      
    input.name = form.values.name;
      
      
        
    
      
      
      
    input.users = { connect: form.values.users?.map((item) => ({ id: item.id })) };
        
    
      
    input.description = form.values.description;
      
      
        
    
      
    input.color = form.values.color;
      
      
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: UserGroupUpdateInput = {};
    
      
    input.name = { set: form.values.name };
      
      
      
    
      
      
      
    input.users = {
      connect: redundants(form.values.users, data?.userGroup?.users)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.userGroup?.users, form.values.users)?.map((item) => ({ id: item.id })),
    };
      
    
      
    input.description = { set: form.values.description };
      
      
      
    
      
    input.color = { set: form.values.color };
      
      
      
    
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
