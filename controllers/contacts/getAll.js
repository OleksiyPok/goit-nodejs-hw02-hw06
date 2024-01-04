const appRoot = process.cwd();
const { Contact } = require(appRoot + "/models");

const { errorWrapper } = require(appRoot + "/helpers");

const getAll = async (req, res) => {
  const { id: ownerid } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  const skip = (page - 1) * limit;
  const query = favorite ? { owner: ownerid, favorite } : { owner: ownerid };

  const allData = await Contact.find(query, "-createdAt -updatedAt -owner")
    .and([{ owner: ownerid }])
    .exec();

  const currPageData = await Contact.find(
    query,
    "-createdAt -updatedAt -owner",
    {
      skip: Number(skip),
      limit: Number(limit),
    }
  )
    .and([{ owner: ownerid }])
    .exec();

  res.status(200).json({
    status: "success",
    code: 200,
    dataLength: allData.length,
    page: Number(page),
    dataOnPage: currPageData.length,
    currPageData,
  });
};

module.exports = errorWrapper(getAll);
