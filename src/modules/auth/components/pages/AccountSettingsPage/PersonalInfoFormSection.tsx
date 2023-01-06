import { User } from '@/common/types/User'
import {
  Card,
  CardBody,
  Text,
  Icon,
  useColorModeValue,
  CardHeader,
  Heading,
  Divider,
  FormControl,
  FormLabel,
  Input,
  chakra,
  Button,
} from '@chakra-ui/react'
import { FC, FormEventHandler, useState } from 'react'

type Props = {
  user: User
}

const Form = chakra('form')

const PersonalInfoFormSection: FC<Props> = ({ user }) => {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const inputs = [
    {
      formKey: 'name',
      label: 'Name',
      type: 'text',
      value: name,
      setter: setName,
    },
    {
      formKey: 'email',
      label: 'Email',
      type: 'email',
      value: email,
      setter: setEmail,
    },
  ]

  const change: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <Card as={'section'} variant={useColorModeValue('filled', 'outline')}>
      <CardHeader>
        <Heading fontSize={'xl'}>Personal Information</Heading>
      </CardHeader>
      <CardBody paddingY={0}>
        <Divider />
      </CardBody>
      <CardBody textAlign={'center'}>
        <Form display={'flex'} flexDirection={'column'} rowGap={'4'}>
          {inputs.map(({ formKey, label, setter, type, value }) => (
            <FormControl key={formKey} isRequired>
              <FormLabel>{label}</FormLabel>
              <Input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
              />
            </FormControl>
          ))}
          <Button>Submit</Button>
        </Form>
      </CardBody>
    </Card>
  )
}

export default PersonalInfoFormSection
