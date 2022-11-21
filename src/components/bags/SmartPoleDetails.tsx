import { useParams } from 'react-router-dom';

import { useSmartPoleForm } from '../../api/forms/smartPole';

import { Box } from '../atoms/Box';
import { Heading } from '../atoms/Heading';
import { Form } from '../atoms/Form';
import { Button } from '../atoms/Button';


import { InputString } from './InputString';

import { InputNumber } from './InputNumber';

import { InputZone } from './InputZone';

import { InputDevices } from './InputDevices';
  

export const SmartPoleDetails = () => {
  const { id: parameter } = useParams();
  const id = parameter ? parseInt(parameter) : undefined;

  const form = useSmartPoleForm(id);

  return (
    <Box variant='drawer'>
      <Heading className='text-lg font-bold'>SmartPole Details</Heading>
      <Form className='form' onSubmit={form.submit}>
        
        <InputString label='Name' required={true} placeholder='' {...form.input('name')} />
        
        <InputString label='Serial Number' required={true} placeholder='' {...form.input('serial')} />
        
        <InputNumber label='Latitude' required={true} placeholder='' {...form.input('latitude')} />
        
        <InputNumber label='Longitude' required={true} placeholder='' {...form.input('longitude')} />
        
        <InputZone label='Zone' required={true} placeholder='Select Zone' {...form.input('zone')} />
        
        <InputDevices label='Devices' required={false} placeholder='' {...form.input('devices')} />
        
        <InputNumber label='External Location ID' required={false} placeholder='' {...form.input('connectLocationId')} />
        
        <InputString label='External Device ID' required={false} placeholder='' {...form.input('connectDeviceId')} />
        
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
