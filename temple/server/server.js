import app from "./app";
import config from "./config/index";

const { PORT } = config;

//실행
app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`);
});
