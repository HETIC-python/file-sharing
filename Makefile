run:
	docker compose up 

bsh:
	docker compose exec -it backend bash

fsh:
	docker compose exec -it frontend bash

dsh:
	docker compose exec -it database bash

brt:
	docker compose restart backend

frt:
	docker compose restart frontend

drt:
	docker compose restart database
	
help:
	@echo "hello!"
	@echo "the following commands are available:"
	@echo "+----------------------------------------+"
	@echo "| run | start the containers             |"
	@echo "+----------------------------------------+"
	@echo "| bsh | enter bash in backend container  |"
	@echo "+----------------------------------------+"
	@echo "| fsh | enter bash in frontend container |"
	@echo "+----------------------------------------+"
	@echo "| dsh | enter bash in database container |"
	@echo "+----------------------------------------+"
	@echo "| brt | restart backend container        |"
	@echo "+----------------------------------------+"
	@echo "| frt | restart frontend container       |"
	@echo "+----------------------------------------+"
	@echo "| drt | restart database container       |"
	@echo "+----------------------------------------+"

