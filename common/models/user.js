var utils = require('loopback-datasource-juggler/lib/utils')

module.exports = function (user) {
    // Set the username to the users email address by default.
    user.observe('before save', function setDefaultUsername(ctx, next) {
        if (ctx.instance) {
            // if (ctx.isNewInstance) {
            //     ctx.instance.username = ctx.instance.email;
            // }
            ctx.instance.status = 'created';
            ctx.instance.created = Date.now();
        }
        next();
    });

    /**
     * Method that retrieves all the roles in the system
     * @param {Function} cb Callback function
     * @returns boolean
     */
    user.getAllRoleNames = function getAllRoleNames(cb) {
        cb = cb || utils.createPromiseCallback();

        user.app.models.Role
                .find()
                .then(function (roles) {
                    return roles.map(function (role) {
                        return role.name;
                    })
                })
                .then(function (res) {
                    return cb(null, res)
                })
                .catch(cb)

        return cb.promise
    }

    /**
     * Get the roles for this user.
     * @param {Function} [cb] Callback function.
     * @returns {Object} A map of all roles of this user
     */
    user.prototype.info = function info(cb) {
        cb = cb || utils.createPromiseCallback()

        var result = {
            user: this,
            roles: {}
        }
        var allRoleNames = []
        var userRoleNames = []

        this.roles.getAsync()
                .then(function (userRoles) {
                    return userRoles.map(function (userRole) {
                        return userRole.name
                    })
                })
                .then(function (res) {
                    userRoleNames = res
                    return user.getAllRoleNames()
                })
                .then(function (res) {
                    allRoleNames = res
                    result.roles = {
                        assigned: allRoleNames.filter(function (name) {
                            return userRoleNames.indexOf(name) !== -1;
                        }),
                        unassigned: allRoleNames.filter(function (name) {
                            return userRoleNames.indexOf(name) === -1;
                        })
                    }
                })
                .then(function () {
                    cb(null, result)
                })
                .catch(cb)
        return cb.promise
    }

};
