# Consumo de API: Axios & React Query

A aplicação utiliza uma combinação poderosa de **Axios** para transporte HTTP e **React Query** para gerenciamento de estado assíncrono.

## A Camada de Transporte (`src/lib/api.ts`)
Utilizamos uma instância do Axios pré-configurada chamada `api`.
- **Base URL**: Definida via variáveis de ambiente (`NEXT_PUBLIC_API_URL`).
- **Headers**: Configuração padrão de `Content-Type: application/json`.

## O Conceito "Abraçar" (Wrapper)
Na prática, o **React Query "embrulha" o Axios**. 

### Como funciona:
1. O **Axios** é responsável apenas pela requisição bruta (`api.get`, `api.post`).
2. O **React Query** (via `useQuery` ou `useMutation`) chama essa função do Axios.
3. O React Query decide se deve retornar o dado do cache ou esperar a requisição do Axios terminar.

**Exemplo Prático**:
```typescript
export function useGetAllTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      // Axios faz o transporte
      const { data } = await api.get('/tasks'); 
      return data;
    },
  });
}
```
Neste cenário, o `useQuery` prove os estados de carregamento e cache, enquanto o `api.get` (Axios) faz a conversa real com o backend Node.js.
