import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBase } from '../../shared/Layouts';
import { DetailToolBar } from '../../shared/components';
import { useEffect, useState } from 'react';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { Box, Grid2, LinearProgress, Paper, Typography } from '@mui/material';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';

import '../../shared/forms/TraducoesYup';

import * as yup from 'yup';

interface IFormData {
  nome: string;
}

const formValidationSchema: yup.ObjectSchema<IFormData>  = yup.object().shape({
  nome: yup
    .string()
    .required()
    .min(3)
});

export const DetalheDeCidades: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      CidadesService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/cidades');
        } else {
          setNome(result.nome);
          console.log(result);

          formRef.current?.setData(result);
        }
      });
    } else {
      // caso o id seja nova estamos limpando os dados
      // para evitar que os dados de um clientes detalhado vá parar nos
      // inputs de cadastro de um novo cliente.
      formRef.current?.setData({
        nome: '',
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);
        console.log(dadosValidados);

        if (id == 'nova') {
          // Criando um registro
          CidadesService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
              return;
            }

            if (isSaveAndClose()) {
              navigate('/cidades');
              return;
            }

            navigate(`/cidades/detalhe/${result}`);
            return;
          });
        } else {
          // Editando um registro
          CidadesService.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);

            if (result instanceof Error) {
              alert(result.message);
              return;
            }

            if (isSaveAndClose()) {
              navigate('/cidades');
              return;
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });
        console.log(validationErrors);
        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/cidades');
        }
      });
    }
  };

  return (
    <LayoutBase
      pageTitle={id === 'nova' ? 'Nova cidade' : nome}
      barraDeFerramentas={
        <DetailToolBar
          textoBotaoNovo='Nova'
          mostrarBotaoSalvarEVoltar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate('/cidades/detalhe/nova')}
          aoClicarEmVoltar={() => navigate('/cidades')}
        />
      }
    >
      <VForm
        ref={formRef}
        onSubmit={(dados) => handleSave(dados)}
      >
        <Box
          margin={1}
          display='flex'
          flexDirection='column'
          component={Paper}
          variant='outlined'
        >
          <Grid2
            container
            direction='column'
            padding={2}
            spacing={2}
          >
            <Grid2 item>
              {isLoading && <LinearProgress variant='indeterminate' />}
            </Grid2>
            <Grid2 item>
              <Typography variant='h6'>Geral</Typography>
            </Grid2>
            <Grid2
              container
              item
              direction='row'
            >
              <Grid2
                item
                size={{ xs: 12, sm: 8, md: 6, lg: 4 }}
              >
                <VTextField
                  fullWidth
                  label='Nome'
                  placeholder='Rio de Janeiro'
                  name='nome'
                  disabled={isLoading}
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Box>
      </VForm>
    </LayoutBase>
  );
};
