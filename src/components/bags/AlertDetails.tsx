import { useParams } from 'react-router-dom';

import { useAlertForm } from '../../api/forms/alert';

import { Box } from '../atoms/Box';
import { Heading } from '../atoms/Heading';
import { Form } from '../atoms/Form';
import { Button } from '../atoms/Button';


import { InputDevice } from './InputDevice';

import { InputString } from './InputString';

import { InputPriority } from './InputPriority';
  

export const AlertDetails = () => {
  const { id: parameter } = useParams();
  const id = parameter ? parseInt(parameter) : undefined;

  const form = useAlertForm(id);

  return (
    <Box variant='drawer'>
      <Heading className='text-lg font-bold'>Alert Details</Heading>
      <Form className='form' onSubmit={form.submit}>
        
        <InputDevice label='Device' required={false} placeholder='Select the device' {...form.input('device')} />
        
        <InputString label='Message' required={true} placeholder='' {...form.input('message')} />
        
        <InputPriority label='Priority' required={true} placeholder='Select priority' {...form.input('priority')} />
        
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
