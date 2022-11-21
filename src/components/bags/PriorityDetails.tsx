import { useParams } from 'react-router-dom';

import { usePriorityForm } from '../../api/forms/priority';

import { Box } from '../atoms/Box';
import { Heading } from '../atoms/Heading';
import { Form } from '../atoms/Form';
import { Button } from '../atoms/Button';


import { InputString } from './InputString';

import { InputAlerts } from './InputAlerts';

import { InputEvents } from './InputEvents';
  

export const PriorityDetails = () => {
  const { id: parameter } = useParams();
  const id = parameter ? parseInt(parameter) : undefined;

  const form = usePriorityForm(id);

  return (
    <Box variant='drawer'>
      <Heading className='text-lg font-bold'>Priority Details</Heading>
      <Form className='form' onSubmit={form.submit}>
        
        <InputString label='Name' required={true} placeholder='' {...form.input('name')} />
        
        <InputAlerts label='Alerts' required={false} placeholder='' {...form.input('alerts')} />
        
        <InputEvents label='Events' required={false} placeholder='' {...form.input('events')} />
        
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
