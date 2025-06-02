const { spawn } = require("child_process");

// Запуск React development сервера
const reactProcess = spawn("npm", ["run", "dev"], {
  stdio: "inherit",
  shell: true,
});

reactProcess.on("close", (code) => {
  console.log(`React процесс завершен с кодом ${code}`);
});

// Обработка сигналов для корректного завершения
process.on("SIGINT", () => {
  reactProcess.kill();
  process.exit();
});
