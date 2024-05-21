import useAuth from "./useAuth";
import useAxiosPrivate from "./usePrivate";

export default async function getUser() {
    const { isLoggedIn } = useAuth(); // Получаем статус авторизации
    const axiosPrivateInstance = useAxiosPrivate(); // Получаем приватный экземпляр axios

    if (!isLoggedIn) {
        return null; // Если пользователь не авторизован, возвращаем null
    }

    try {
        const response = await axiosPrivateInstance.get('auth/user'); // Получаем данные пользователя
        return response.data; // Возвращаем данные пользователя
    } catch (error) {
        console.log(error.response); // Обрабатываем ошибку, если она возникла
        return null; // Возвращаем null в случае ошибки
    }
}
