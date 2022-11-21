import { useParams } from 'react-router-dom';

import { useFormationForm } from '../../api/forms/formation';

import { Box } from '../atoms/Box';
import { Heading } from '../atoms/Heading';
import { Form } from '../atoms/Form';
import { Button } from '../atoms/Button';


import { InputString } from './InputString';

import { InputSolutions } from './InputSolutions';

import { InputRegion } from './InputRegion';

import { InputZones } from './InputZones';
  

export const FormationDetails = () => {
  const { id: parameter } = useParams();
  const id = parameter ? parseInt(parameter) : undefined;

  const form = useFormationForm(id);

  return (
    <Box variant='drawer'>
      <Heading className='text-lg font-bold'>Formation Details</Heading>
      <Form className='form' onSubmit={form.submit}>
        
        <InputString label='Name' required={true} placeholder='' {...form.input('name')} />
        
        <InputString label='Address' required={true} placeholder='' {...form.input('address')} />
        
        <InputSolutions label='Solutions' required={false} placeholder='' {...form.input('solutions')} />
        
        <InputRegion label='Region' required={true} placeholder='Select Region' {...form.input('region')} />
        
        <InputZones label='Zones' required={false} placeholder='' {...form.input('zones')} />
        
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
