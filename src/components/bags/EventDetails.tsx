import { useParams } from 'react-router-dom';

import { useEventForm } from '../../api/forms/event';

import { Box } from '../atoms/Box';
import { Heading } from '../atoms/Heading';
import { Form } from '../atoms/Form';
import { Button } from '../atoms/Button';


import { InputMoment } from './InputMoment';

import { InputString } from './InputString';

import { InputDevice } from './InputDevice';

import { InputPriority } from './InputPriority';
  

export const EventDetails = () => {
  const { id: parameter } = useParams();
  const id = parameter ? parseInt(parameter) : undefined;

  const form = useEventForm(id);

  return (
    <Box variant='drawer'>
      <Heading className='text-lg font-bold'>Event Details</Heading>
      <Form className='form' onSubmit={form.submit}>
        
        <InputMoment label='Moment' required={true} placeholder='' {...form.input('moment')} />
        
        <InputString label='Message' required={true} placeholder='' {...form.input('message')} />
        
        <InputDevice label='Device' required={true} placeholder='Select the device' {...form.input('device')} />
        
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
