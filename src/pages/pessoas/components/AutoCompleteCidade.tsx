import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';
import { useDebounce } from '../../../shared/hooks';
import { useField } from '@unform/core';

type TAutoCompleteOption = {
  id: number;
  label: string;
};

interface IAutoCompleteCidadeProps {
  isExternalLoading?: boolean;
}

export const AutoCompleteCidade: React.FC<IAutoCompleteCidadeProps> = ({
  isExternalLoading = false,
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField('cidadeId');

  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
  const isFirstRender = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [busca, setBusca] = useState('');
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);
  const { debounce } = useDebounce(500);

  const realizarBusca = useCallback(() => {
    // console.log(busca);
    CidadesService.getAll(1, busca).then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        //alert(result.message);
      } else {
        console.log(result);
        setOpcoes(
          result.data.map((cidade) => ({ id: cidade.id, label: cidade.nome }))
        );
      }
    });
  }, [busca]);

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [registerField, fieldName, selectedId]);

  useEffect(() => {
    setIsLoading(true);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      realizarBusca();
    } else {
      debounce(realizarBusca);
    }
  }, [busca]);

  const autoCompleteSelecetedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = opcoes.find((opcao) => opcao.id === selectedId);
    if (!selectedOption) return null;

    return selectedOption;
  }, [selectedId, opcoes]);

  return (
    <Autocomplete
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem opções'
      loadingText='Carregando...'
      disablePortal
      options={opcoes}
      loading={isLoading}
      disabled={isExternalLoading}
      onInputChange={(_, newValue) => setBusca(newValue)}
      value={autoCompleteSelecetedOption}
      onChange={(_, newValue) => {
        setSelectedId(newValue?.id);
        setBusca('');
        clearError();
      }}
      popupIcon={
        isLoading || isExternalLoading ? (
          <CircularProgress size={28} />
        ) : undefined
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label='Cidade'
          error={!!error}
          helperText={error}
        />
      )}
    />
  );
};
