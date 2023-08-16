// import { useEffect } from 'react';
// import { useQuery, useQueryClient } from 'react-query';
// import API from '~/config/network';
// import cloneDeep from 'lodash/cloneDeep';
//
// export function Test() {
//     const queryClient = useQueryClient();
//
//     const { isSuccess } = useQuery({
//         queryKey: 'test',
//         queryFn: async () => {
//             const response = await API.get('/api/v1/posts/workshop/3');
//             return response.data;
//         },
//         staleTime: Infinity,
//         onSuccess() {},
//     });
//
//     useEffect(() => {
//         if (!isSuccess) return;
//         queryClient.invalidateQueries('test');
//     }, [isSuccess]);
//
//     const data = () => {
//         // console.log('re-render call data');
//         // return {
//         //     data: [
//         //         {
//         //             id: 1,
//         //             content: '1',
//         //         },
//         //         {
//         //             id: 2,
//         //             content: '2',
//         //         },
//         //         {
//         //             id: 3,
//         //             content: '3',
//         //         },
//         //     ],
//         // };
//         return queryClient.getQueryData('test');
//     };
//
//     const handleClick = (id) => {
//         // queryClient.setQueryData('test', (oldData) => {
//         //     // const newData = oldData.data.filter((item) => item.id !== id);
//         //     // return { ...oldData, data: newData };
//         //     oldData.data = oldData.data.filter((item) => item.id !== id);
//         //     return oldData;
//         // });
//     };
//
//     useEffect(() => {
//         setInterval(() => {
//             queryClient.setQueryData('test', (oldData) => {
//                 // const newData = oldData.data.filter((item) => item.id !== id);
//                 // return { ...oldData, data: newData };
//                 oldData.data.pop();
//                 return oldData;
//             });
//         }, 3000);
//     }, []);
//
//     useEffect(() => {
//         console.log('re-render');
//     });
//
//     return (
//         <div>
//             <div>{data()?.data?.length}</div>
//             <div>
//                 {data()?.data?.map((item) => (
//                     <div onClick={() => handleClick(item.id)} key={item.id}>
//                         {item.content}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

export function Test() {
    return <div>test</div>;
}
