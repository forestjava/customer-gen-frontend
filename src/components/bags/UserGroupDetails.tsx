import { useParams } from 'react-router-dom';

import { useUserGroupForm } from '../../api/forms/userGroup';

import { Box } from '../atoms/Box';
import { Heading } from '../atoms/Heading';
import { Form } from '../atoms/Form';
import { Button } from '../atoms/Button';


import { InputString } from './InputString';

import { InputUsers } from './InputUsers';
  

export const UserGroupDetails = () => {
  const { id: parameter } = useParams();
  const id = parameter ? parseInt(parameter) : undefined;

  const form = useUserGroupForm(id);

  return (
    <Box variant='drawer'>
      <Heading className='text-lg font-bold'>UserGroup Details</Heading>
      <Form className='form' onSubmit={form.submit}>
        
        <InputString label='Name' required={true} placeholder='' {...form.input('name')} />
        
        <InputUsers label='Users' required={false} placeholder='' {...form.input('users')} />
        
        <InputString label='Description' required={false} placeholder='' {...form.input('description')} />
        
        <InputString label='Color' required={false} placeholder='' {...form.input('color')} />
        
        <Box variant='row'>
          {!form.isCreate && (
            <Button variant='dangerous' {...form.button()} onClick={form.remove}>
              Remove
            </Button>
          )}
          <Box className='w-full' />
          <Button variant='primary' {...form.button('submit')}>
            {form.isCreate ? 'Add' : 'Save'}
          </Button>
          <Button variant='secondary' {...form.button()} onClick={form.close}>
            Close
          </Button>
        </Box>
      </Form>
    </Box>
  );
};
