module.exports = {
  async rewrites() {
    return [
      {
        source: '/proxy-sb',
        destination: 'http://studentsblog.sst.edu.sg/?m=1',
      },
    ]
  },
}