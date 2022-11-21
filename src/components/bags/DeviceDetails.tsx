import { useParams } from 'react-router-dom';

import { useDeviceForm } from '../../api/forms/device';

import { Box } from '../atoms/Box';
import { Heading } from '../atoms/Heading';
import { Form } from '../atoms/Form';
import { Button } from '../atoms/Button';


import { InputString } from './InputString';

import { InputDeviceType } from './InputDeviceType';

import { InputAlerts } from './InputAlerts';

import { InputEvents } from './InputEvents';

import { InputSmartPole } from './InputSmartPole';
  

export const DeviceDetails = () => {
  const { id: parameter } = useParams();
  const id = parameter ? parseInt(parameter) : undefined;

  const form = useDeviceForm(id);

  return (
    <Box variant='drawer'>
      <Heading className='text-lg font-bold'>Device Details</Heading>
      <Form className='form' onSubmit={form.submit}>
        
        <InputString label='Serial number ' required={true} placeholder='' {...form.input('serial')} />
        
        <InputDeviceType label='Device Type' required={true} placeholder='Select Device Type' {...form.input('type')} />
        
        <InputString label='UUID' required={false} placeholder='' {...form.input('uuid')} />
        
        <InputAlerts label='Alerts' required={false} placeholder='' {...form.input('alerts')} />
        
        <InputEvents label='Events' required={false} placeholder='' {...form.input('events')} />
        
        <InputSmartPole label='Smart Pole' required={true} placeholder='Select Smart Pole' {...form.input('smartPole')} />
        
        <InputString label='Name' required={true} placeholder='' {...form.input('name')} />
        
        <InputString label='External Parameter Index' required={false} placeholder='' {...form.input('connectParamIndex')} />
        
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
