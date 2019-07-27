module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://192.168.1.130:8888/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "/api"
        }
      },
      "/per": {
        target: "http://192.168.1.130:8888/",
        changeOrigin: true,
        ws: true
      }
    }
  }
};

// module.exports = {
//   devServer: {
//     proxy: {
//       "^/api": {
//         target: "http://localhost:8888/",
//         ws: true,
//         changeOrigin: true,
//         pathRewrite: {
//           "^/api": "/api" // rewrite path
//         }
//       },
//       "^/per": {
//         target: "http://localhost:8888/",
//         ws: true,
//         changeOrigin: true,
//         pathRewrite: {
//           "^/per": "/per" // rewrite path
//         }
//       },
//       "^/server": {
//         target: "http://192.168.0.119:8888/",
//         ws: true,
//         changeOrigin: true,
//         pathRewrite: {
//           "^/server": "/server" // rewrite path
//         }
//       }
//     }
//   }
// };
