import { useParams } from 'react-router-dom';

import { useZoneForm } from '../../api/forms/zone';

import { Box } from '../atoms/Box';
import { Heading } from '../atoms/Heading';
import { Form } from '../atoms/Form';
import { Button } from '../atoms/Button';


import { InputString } from './InputString';

import { InputFormation } from './InputFormation';

import { InputSmartPoles } from './InputSmartPoles';
  

export const ZoneDetails = () => {
  const { id: parameter } = useParams();
  const id = parameter ? parseInt(parameter) : undefined;

  const form = useZoneForm(id);

  return (
    <Box variant='drawer'>
      <Heading className='text-lg font-bold'>Zone Details</Heading>
      <Form className='form' onSubmit={form.submit}>
        
        <InputString label='Name' required={true} placeholder='' {...form.input('name')} />
        
        <InputFormation label='Formation' required={true} placeholder='Select Formation' {...form.input('formation')} />
        
        <InputSmartPoles label='Smart Poles' required={false} placeholder='' {...form.input('smartPoles')} />
        
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
