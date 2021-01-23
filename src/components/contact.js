import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

// Material UI
import { FormControl, Button, TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'

const Contact = () => {
  const { handleSubmit } = useForm()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')

  const [error, setError] = useState(false)
  const [emailError, setEmailError] = useState('')

  function emailValue(e, type) {
    const value = e.target.value
    const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

    if (filter.test(value)) {
      setError(false)
      setEmailError('')
      setEmail(value)
    } else {
      setError(true)
      setEmailError('Invalid email')
    }
  }

  function pressSubmit(event) {
    const templateId = 'template_lwtzc8f'

    sendFeedback(templateId, {
      message: content,
      from_name: name,
      reply_to: email,
    })
  }

  function sendFeedback(templateId, variables) {
    window.emailjs
      .send('service_h2tf0sn', templateId, variables)
      .then(res => {
        setContent('')
        console.log('Email successfully sent!')
        console.log(content)
      })
      // Handle errors here however you like, or use a React error boundary
      .catch(err =>
        console.error(
          'Oh NO, you failed. Here some thoughts on the error that occured:',
          err,
        ),
      )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: 20,
        padding: 20,
      }}
    >
      <form
        style={{ width: '50%' }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(pressSubmit)}
      >
        <h2>Contact Form</h2>

        <FormControl margin="normal" fullWidth>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <TextField
                label="Name"
                variant="outlined"
                color="secondary"
                onChange={event => setName(event.target.value)}
              />
            </Grid>
          </Grid>
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <TextField
            error={error}
            helperText={emailError}
            label="Email"
            variant="outlined"
            color="primary"
            onChange={e => emailValue(e, 'email')}
          />
        </FormControl>

        <FormControl margin="normal" fullWidth>
          <TextField
            label="Message"
            variant="outlined"
            color="secondary"
            multiline
            rows={20}
            onChange={event => setContent(event.target.value)}
          />
        </FormControl>

        <Button
          variant="contained"
          color="secondary"
          size="medium"
          type="submit"
        >
          Send
        </Button>
      </form>
    </div>
  )
}

export default Contact
