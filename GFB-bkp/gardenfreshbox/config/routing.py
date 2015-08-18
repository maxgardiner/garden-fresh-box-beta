from routes import Mapper

def make_map(config):
	map = Mapper(directory=config['pylons.paths']['controllers'],
				 always_scan=config['debug'])
	map.minimization = False
	map.explicit = False

	##################
	# ERROR HANDLING #
	##################

	map.connect('/error/{action}', controller='error')
	map.connect('/error/{action}/{id}', controller='error')
	
	###################
	# USER ACCESSIBLE #
	###################

	# Administrator-Only Pages
	map.connect('/dashboard', controller='index', action='dashboard')					# dashboard
	map.connect('/hostsites', controller='index', action='manageHS')				# manage host sites
	map.connect('/accounts', controller='index', action='manageAccounts')			# manage accounts
	map.connect('/masterorders', controller='index', action='masterOrderList') 		# master order list
	map.connect('/donors', controller='index', action='masterDonorList')			# master donor list
	map.connect('/mastercustomers', controller='index', action='masterCustList')	# master customer list
	map.connect('/distribution', controller='index', action='distribution')			# orders for distribution
	map.connect('/cashsales', controller='index', action='cashsales') 				# cash sales
	map.connect('/changepassword', controller='index', action='changepassword') 				# cash sales
	map.connect('/editprofile', controller='index', action='editprofile') 				# cash sales

	# Generic Pages
	map.connect('/', controller='index', action='index')							# index / homepage
	map.connect('/login', controller='index', action='login')						# login page
	map.connect('/shop/buy', controller='index', action='buy')						# purchase box
	map.connect('/shop/confirmation', controller='index', action='confirm')						# purchase box
	map.connect('/info', controller='index', action='info')							# information about garden fresh box
	map.connect('/donate', controller='index', action='donate')						# donations page
	map.connect('/contact', controller='index', action='contact')					# garden fresh box contact information

	###################
	# DATA ACCESSIBLE #
	###################
	
	map.connect('/user/me', controller='users', action='me')						# displays information in cookie (GET)
	map.connect('/user/logout', controller='users', action='logout')				# logs use out (GET)
	map.connect('/user/auth', controller='users', action='auth')					# logs user in (GET)
	map.connect('/user/cp', controller='users', action='changepassword')			# changes user password (PUT)
	map.connect('/user', controller='users', action='user')							# account information (GET, PUT)

	map.connect('/hs', controller='hostsites', action='host_site')					# host site information (GET, PUT)
	map.connect('/hsJSON', controller='hostsites', action='hsJSON')					# host site raw JSON (GET)

	map.connect('/sales/customers', controller='sales', action='customers')	# all customers (GET)
	map.connect('/sales/donors', controller='sales', action='donors')				# all donors (GET)
	map.connect('/sales/donation', controller='sales', action='donations')			# all donations (GET)
	map.connect('/sales/cashsales', controller='sales', action='sales')				# orders (GET,PUT)
	map.connect('/sales/dist', controller='sales', action='dist')					# All sales for a host site (GET)

	return map
