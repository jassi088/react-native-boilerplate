import { postVisitorCheck, VisitorCheckInterface } from '@/endpoints/POST_VisitorCheck';
import { BaseResponse } from '@/interfaces/BaseResponse';
import { useMutation, UseMutationOptions } from 'react-query';

export function useVisitorCheck(
  params: UseMutationOptions<BaseResponse<VisitorCheckInterface[]>, BaseResponse, VisitorCheckInterface>
) {
  return useMutation({
    ...params,
    mutationKey: ['visitor-check'],
    mutationFn: (body: VisitorCheckInterface) => postVisitorCheck(body)
  });
}
