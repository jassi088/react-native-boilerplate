import {
  postVisitorCheckUid,
  ResponseVisitorCheckUidInterface,
  VisitorCheckUidInterface
} from '@/endpoints/POST_VisitorCheckUid';
import { BaseResponse } from '@/interfaces/BaseResponse';
import { useMutation, UseMutationOptions } from 'react-query';

export function useVisitorCheckUid(
  params: UseMutationOptions<BaseResponse<ResponseVisitorCheckUidInterface>, BaseResponse, VisitorCheckUidInterface>
) {
  return useMutation({
    ...params,
    mutationKey: ['visitor-check-uid'],
    mutationFn: (body: VisitorCheckUidInterface) => postVisitorCheckUid(body)
  });
}
