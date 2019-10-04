const User = require('../models/User');

/** metodos:
 * index(listar as seção),
 * show(listar uma seção expecifica),
 * store(cria uma seção),
 * update(altera),
 * destroy(deleta)
 */

module.exports = {
    async store(req, res) {
        const email = req.body.email;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
}