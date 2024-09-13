import investServices, { EditAssetRequest } from './investServices.ts';
import InvestServices, { AddAssetRequest } from './investServices.ts';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../../data/react-query.ts';

const QUERY_KEY_GET_INVEST_STATS = 'QUERY_KEY_GET_INVEST_STATS';
const QUERY_KEY_GET_ASSETS = 'QUERY_KEY_GET_ASSETS';

export function useGetInvestStats() {
  async function getInvestStats() {
    const data = await investServices.getInvestStats();
    return data.data;
  }

  return useQuery({
    queryKey: [QUERY_KEY_GET_INVEST_STATS],
    queryFn: getInvestStats,
    placeholderData: keepPreviousData,
  });
}

export function useGetAssets() {
  async function getAssets() {
    const data = await investServices.getAssets();
    return data.data;
  }

  return useQuery({
    queryKey: [QUERY_KEY_GET_ASSETS],
    queryFn: getAssets,
    placeholderData: keepPreviousData,
  });
}

export function useRemoveAsset() {
  async function removeAsset(assetId: bigint) {
    const result = await InvestServices.removeAsset(assetId);

    void queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_GET_ASSETS],
    });
    return result;
  }

  return useMutation({
    mutationFn: removeAsset,
  });
}

export function useUpdateAssetValue() {
  async function updateAssetValue(request: {
    assetId: bigint;
    newValue: number;
  }) {
    const result = await InvestServices.updateAssetValue(
      request.assetId,
      request.newValue,
    );

    void queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_GET_ASSETS],
    });
    return result;
  }

  return useMutation({
    mutationFn: updateAssetValue,
  });
}

export function useAddAsset() {
  async function addAsset(request: AddAssetRequest) {
    const result = await investServices.addAsset(request);

    void queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_GET_ASSETS],
    });
    return result;
  }

  return useMutation({
    mutationFn: addAsset,
  });
}

export function useEditAsset() {
  async function editAsset(request: EditAssetRequest) {
    const result = await investServices.editAsset(request);

    void queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_GET_ASSETS],
    });
    return result;
  }

  return useMutation({
    mutationFn: editAsset,
  });
}
