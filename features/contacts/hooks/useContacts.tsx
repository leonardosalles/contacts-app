import { useQuery } from "react-query";

export const useContacts = () => {
    return useQuery('contactsData', () =>
        fetch('https://api.mocki.io/v2/qupn02bi').then(res =>
          res.json()
        )
    );
}
