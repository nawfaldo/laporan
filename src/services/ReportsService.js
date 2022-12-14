const InvariantError = require('../exceptions/InvariantError');
const { prisma } = require('../utils/database.js');

class ReportsService {
  constructor() {}

  async addNewReport({
    reporterName,
    reporterPhoneNumber,
    image,
    location,
    description,
  }) {
    const result = await prisma.laporan.create({
      data: {
        namaPelapor: reporterName,
        nomorPelapor: reporterPhoneNumber,
        gambar: image,
        lokasi: location,
        deskripsi: description,
      },
    });

    if (!result.id) {
      throw new InvariantError('Laporan gagal ditambahkan');
    }

    return result.id;
  }

  async getReports() {
    let result = await prisma.laporan.findMany({});

    return result;
  }

  async deleteReportById(id) {
    const result = await prisma.laporan.delete({
      where: {
        id: Number(id),
      },
    });

    if (!result.length) {
      throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = ReportsService;
