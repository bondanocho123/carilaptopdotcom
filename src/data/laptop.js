import { LaptopApi } from "./LaptopApi";

useEffect(() => {
  AuthApi.get_rekomendasi(7000000, "kuliah", "tinggi")
    .then((res) => {
      console.log("HASIL REKOMENDASI:", res);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);
