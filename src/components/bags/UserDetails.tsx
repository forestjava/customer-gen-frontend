import { useParams } from 'react-router-dom';

import { useUserForm } from '../../api/forms/user';

import { Box } from '../atoms/Box';
import { Heading } from '../atoms/Heading';
import { Form } from '../atoms/Form';
import { Button } from '../atoms/Button';


import { InputString } from './InputString';

import { InputUserRole } from './InputUserRole';

import { InputUserGroups } from './InputUserGroups';
  

export const UserDetails = () => {
  const { id: parameter } = useParams();
  const id = parameter ? parseInt(parameter) : undefined;

  const form = useUserForm(id);

  return (
    <Box variant='drawer'>
      <Heading className='text-lg font-bold'>User Details</Heading>
      <Form className='form' onSubmit={form.submit}>
        
        <InputString label='Username' required={true} placeholder='' {...form.input('username')} />
        
        <InputString label='First name' required={true} placeholder='' {...form.input('firstName')} />
        
        <InputString label='Last name' required={true} placeholder='' {...form.input('lastName')} />
        
        <InputString label='Email' required={true} placeholder='' {...form.input('email')} />
        
        <InputUserRole label='Role' required={true} placeholder='Select role' {...form.input('role')} />
        
        <InputUserGroups label='Groups' required={false} placeholder='' {...form.input('groups')} />
        
        <InputString label='Avatar image' required={false} placeholder='' {...form.input('avatar')} />
        
        <InputString label='Phone' required={false} placeholder='' {...form.input('phone')} />
        
        <InputString label='Job Title' required={false} placeholder='' {...form.input('jobTitle')} />
        
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
