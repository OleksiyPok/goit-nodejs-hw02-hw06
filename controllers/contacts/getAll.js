const appRoot = process.cwd();

const { errorWrapper } = require(appRoot + "/helpers");
const { dbContactServices } = require(appRoot + "/services");

const getAll = async (req, res) => {
  const allData = await dbContactServices.getAll(req);
  const allDataLength = allData.length;

  const { page = 1, limit = 10 } = req.query;
  const pageQuantity = Math.ceil(allDataLength / limit);

  if (page > pageQuantity) {
    currPage = pageQuantity;
  } else {
    currPage = page;
  }

  const skip = (currPage - 1) * limit;

  req.query.skip = skip;
  req.query.page = currPage;

  const currPageData = await dbContactServices.getPaginated(req);

  res.status(200).json({
    status: "success",
    code: 200,
    dataLength: allData.length,
    page: Number(currPage),
    dataOnPage: currPageData.length,
    currPageData,
  });
};

module.exports = errorWrapper(getAll);
