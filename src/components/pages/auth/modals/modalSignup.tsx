import CustomNotification from "@/components/_ui/notification/customNotification";
import usePost from "@/hooks/usePost";
import { schemaAuth } from "@/schemas/auth/schemaAuth";
import { Auth } from "@/types/auth";
import { AuthResponse } from "@/types/authResponse";
import { API_BASE_URL } from "@/utils/apiBaseUrl";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

export default function ModalSignUp() {
  const { control, handleSubmit, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schemaAuth),
  });

  const watchData = watch();
  const { isPosting, response, error, sendRequest } = usePost<Auth, AuthResponse>(`${API_BASE_URL}/auth/register`, watchData);

  useEffect(() => {
    if (error) {
      CustomNotification({
        title: error.response?.status === 409 ? 'Erro' : 'Erro ao registrar',
        message: error.response?.status === 409 ? 'Usuário já existe.' : 'Tente novamente mais tarde.',
      });
    }
    if (response) {
      CustomNotification({
        title: 'Sucesso',
        message: 'Usuário registrado com sucesso!',
      });
      signIn('credentials', {
        name: watchData.name,
        password: watchData.password,
        redirect: false,
      })
        .then((res) => res?.ok && redirect('/dashboard'));
    }
  }, [response, error, watchData]);

  return (
    <form onSubmit={handleSubmit(sendRequest)}>
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            label='Nome'
            value={field.value || ''}
            onChange={(value) => field.onChange(value || '')}
          />
        )}
      />
      <Controller
        name='password'
        control={control}
        render={({ field }) => (
          <PasswordInput
            {...field}
            label='Senha'
            value={field.value || ''}
            onChange={(value) => field.onChange(value || '')}
          />
        )}
      />
      <Group justify="flex-end" mt="md">
        <Button variant="light" fullWidth type="submit" disabled={isPosting} loading={isPosting}>
          Cadastrar
        </Button>
      </Group>
    </form>
  );
}
