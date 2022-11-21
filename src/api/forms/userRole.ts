import { invalidate } from '../../components/providers/DataAccessProvider';
import redundants from '../../utils/redundants';
import { useXForm } from '../../utils/xform';

import {
  useUserRoleQuery,
  UserRoleCreateInput,
  UserRoleUpdateInput,
  useCreateOneUserRoleMutation,
  useDeleteOneUserRoleMutation,
  useUpdateOneUserRoleMutation,
} from '../generated';

const LIST_QUERY_KEY = 'UserRoles';
const ITEM_QUERY_KEY = 'UserRole';

export const useUserRoleForm = (id?: number) => {
  const isCreate = !id;

  const key = { id };

  const { data, isLoading } = useUserRoleQuery({ where: key }, { enabled: !isCreate });

  const form = useXForm({ defaultValues: data?.userRole, disabled: isLoading && !isCreate });

  const create = useCreateOneUserRoleMutation().mutateAsync;
  const update = useUpdateOneUserRoleMutation().mutateAsync;
  const remove = useDeleteOneUserRoleMutation().mutateAsync;

  const createElement = async () => {
    const input: UserRoleCreateInput = {};
    
      
    input.name = form.values.name;
      
      
        
    
      
      
      
    input.users = { connect: form.values.users?.map((item) => ({ id: item.id })) };
        
    
    await create({ data: input });
    await invalidate(LIST_QUERY_KEY);
    form.close();
  };

  const updateElement = async () => {
    const input: UserRoleUpdateInput = {};
    
      
    input.name = { set: form.values.name };
      
      
      
    
      
      
      
    input.users = {
      connect: redundants(form.values.users, data?.userRole?.users)?.map((item) => ({ id: item.id })),
      disconnect: redundants(data?.userRole?.users, form.values.users)?.map((item) => ({ id: item.id })),
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
